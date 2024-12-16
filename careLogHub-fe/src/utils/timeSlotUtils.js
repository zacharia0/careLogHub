import dayjs from 'dayjs'
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween)

export const TIME_SLOTS = {
    morning:{label:"Morning"},
    afternoon:{label:"Afternoon"},
    evening:{label:"Evening"},
    bedtime:{label:"Bedtime",}
};


export const filterMedicationByTimeSlot = (medications, timeSlot) =>{
    return medications.filter((med) => med.schedules.some((schedule) => schedule.time_slot === timeSlot))
}



export const getCurrentTimeSlot = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) return "morning";
    if (currentHour >= 12 && currentHour < 16) return "afternoon";
    if (currentHour >= 16 && currentHour < 18) return "evening";
    return "bedtime";
};
