document.addEventListener('DOMContentLoaded', function() {
    const doctors = [
        { name: 'Dr. John Doe', specialty: 'Cardiologist', availability: 'Available' },
        { name: 'Dr. Jane Smith', specialty: 'Neurologist', availability: 'On Call' },
        { name: 'Dr. Emily Davis', specialty: 'Pediatrician', availability: 'Available' },
        { name: 'Dr. Michael Brown', specialty: 'Orthopedic', availability: 'Not Available' }
    ];

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const displayDoctors = () => {
        const doctorList = document.getElementById('doctor-list');
        doctorList.innerHTML = '';
        doctors.forEach(doctor => {
            const doctorDiv = document.createElement('div');
            doctorDiv.classList.add('doctor');
            doctorDiv.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Specialty: ${doctor.specialty}</p>
                <p>Availability: ${doctor.availability}</p>
            `;
            doctorList.appendChild(doctorDiv);
        });
    };

    const displayPatients = () => {
        const patientList = document.getElementById('patient-list');
        patientList.innerHTML = '';
        patients.forEach((patient, index) => {
            const patientDiv = document.createElement('div');
            patientDiv.classList.add('patient');
            patientDiv.innerHTML = `
                <h3>${patient.name}</h3>
                <p>Age: ${patient.age}</p>
                <p>Condition: ${patient.condition}</p>
                <button onclick="deletePatient(${index})">Delete</button>
            `;
            patientList.appendChild(patientDiv);
        });
    };

    const displayAppointments = () => {
        const appointmentList = document.getElementById('appointment-list');
        appointmentList.innerHTML = '';
        appointments.forEach((appointment, index) => {
            const appointmentDiv = document.createElement('div');
            appointmentDiv.classList.add('appointment');
            appointmentDiv.innerHTML = `
                <h3>Patient: ${appointment.patient}</h3>
                <p>Doctor: ${appointment.doctor}</p>
                <p>Date: ${appointment.date}</p>
                <button onclick="deleteAppointment(${index})">Delete</button>
            `;
            appointmentList.appendChild(appointmentDiv);
        });
    };

    const addPatient = (patient) => {
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
        displayPatients();
    };

    const addAppointment = (appointment) => {
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    };

    const addUser = (user) => {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    const authenticateUser = (username, password) => {
        return users.some(user => user.username === username && user.password === password);
    };

    document.getElementById('patient-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('patient-name').value;
        const age = document.getElementById('patient-age').value;
        const condition = document.getElementById('patient-condition').value;
        addPatient({ name, age, condition });
        this.reset();
    });

    document.getElementById('appointment-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const patient = document.getElementById('appointment-patient').value;
        const doctor = document.getElementById('appointment-doctor').value;
        const date = document.getElementById('appointment-date').value;
        addAppointment({ patient, doctor, date });
        this.reset();
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        addUser({ username, password });
        this.reset();
        alert('Registration successful!');
    });

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        if (authenticateUser(username, password)) {
            alert('Login successful!');
        } else {
            alert('Invalid username or password');
        }
        this.reset();
    });

    window.deletePatient = (index) => {
        patients.splice(index, 1);
        localStorage.setItem('patients', JSON.stringify(patients));
        displayPatients();
    };

    window.deleteAppointment = (index) => {
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    };

    document.getElementById('emergency-btn').addEventListener('click', function() {
        const availableDoctors = doctors.filter(doctor => doctor.availability === 'Available');
        if (availableDoctors.length > 0) {
            const doctor = availableDoctors[Math.floor(Math.random() * availableDoctors.length)];
            document.getElementById('emergency-doctor').innerHTML = `
                <h3>Doctor on Call: ${doctor.name}</h3>
                <p>Specialty: ${doctor.specialty}</p>
            `;
        } else {
            document.getElementById('emergency-doctor').innerHTML = '<p>No doctors available right now.</p>';
        }
    });

    const populateDoctorOptions = () => {
        const doctorSelect = document.getElementById('appointment-doctor');
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    };

    populateDoctorOptions();
    displayDoctors();
    displayPatients();
    displayAppointments();
});
