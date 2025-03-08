export interface User {
    id: string;
    nombre: string;
    username: string;
    rol: string;
  }
  
export interface Medic extends User {
    password: string | null;
    especialidad: string;
    estado: string;
    horarios: string;
    assignedNurse?: string; // Optional fields for hardcoded data
    contactInfo?: string;
    email?: string;
    qualifications?: string;
    upcomingAppointments?: number;
  }


export interface Patient extends User{
    edad: number;
    enfermedad: string;
    vitalSigns?: {
      bloodPressure: string;
      heartRate: number;
      temperature: number;
    };
    assignedMedic?: string;
    contactInfo?: string;
    medicalHistory?: string;
  }
  
  export type Role = 'admin' | 'medico' | 'enfermera' | 'paciente';