import { ServiceDurationTime } from "../modules/Slots/slot.constant";

export const generateSlots = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}:00Z`).getTime();
  const end = new Date(`1970-01-01T${endTime}:00Z`).getTime();
  const totalDurationInMinutes = (end - start) / (60 * 1000);

  const nOfSlots = Math.ceil(totalDurationInMinutes / ServiceDurationTime);

  // eslint-disable-next-line prefer-const
  let [startHour, startMinute] = startTime.split(":");

  const endMinute = startMinute;

  const slots = [];

  let startHourNumber = Number(startHour);
  let endHour: string;
  for (let i = 0; i < nOfSlots; i++) {
    // as the time duration is 60 minutes or 1 hour, logic should be changed for less or more than 60 minutes time duration
    const endHourNumber = startHourNumber + 1;

    startHour = startHourNumber.toString().padStart(2, "0");
    endHour = endHourNumber.toString().padStart(2, "0");

    startHourNumber = endHourNumber;

    // const completeTime = `${startHour}:${startMinute}-${endHour}:${endMinute}`;
    const completeTime = {
      startTime: `${startHour}:${startMinute}`,
      endTime: `${endHour}:${endMinute}`,
    };

    slots.push(completeTime);
  }

  return slots;
};
