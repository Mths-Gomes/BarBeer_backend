import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

// DTO > Data Transfer Object
class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByProvider(
    provider_id: object,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.provider === provider_id,
    );

    return findAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;
    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
