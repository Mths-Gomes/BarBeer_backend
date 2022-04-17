import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import AppError from '../../../shared/errors/AppError';

/*
    Single Responsability Principle
    O
    L
    I
    Dependency Inversion
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentWithSameProvider =
      await appointmentsRepository.findOne({
        where: { provider_id },
      });

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentWithSameProvider) {
      if (findAppointmentInSameDate) {
        throw new AppError('This appointment is already booked');
      }
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
