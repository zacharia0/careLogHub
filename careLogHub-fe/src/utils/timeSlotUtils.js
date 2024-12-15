import dayjs from 'dayjs'
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween)

export const TIME_SLOTS = {
    morning:{label:"Morning",start:"00:00",end:"11:59"},
    afternoon:{label:"Afternoon",start:"12:00",end:"15:59"},
    evening:{label:"Evening",start:"16:00",end:"18:59"},
    bedtime:{label:"Bedtime", start:"19:00",end:"23:59"}
};


export const filterMedicationByTimeSlot = (medications, timeSlot) =>{
    return medications.filter((med) => med.schedules.some((schedule) => schedule.time_slot === timeSlot))
}


// export const getCurrentTimeSlot = () =>{
//     const now = dayjs();
//     for(const [key,{start,end}] of Object.entries(TIME_SLOTS)){
//         const startTime = dayjs().set("hour",parseInt(start.split(":")[0])).set("minute",parseInt(start.split(":")[1]))
//         const endTime = dayjs().set("hour",parseInt(end.split(":")[0])).set("minute",parseInt(end.split(":")[1]))
//         if (now.isBetween(startTime, endTime, null, "[]")) {
//             return key; // Return the current time slot (e.g., "bedtime")
//         }
//     }
//     return 'morning' // default fallback
// }


export function getCurrentTimeSlot() {
    const now = dayjs();

    if (now.isBetween(dayjs().startOf("day"), dayjs().hour(11).minute(59).second(59))) {
        return "morning";
    } else if (now.isBetween(dayjs().hour(12), dayjs().hour(15).minute(59).second(59))) {
        return "afternoon";
    } else if (now.isBetween(dayjs().hour(16), dayjs().hour(18).minute(59).second(59))) {
        return "evening";
    } else if (now.isBetween(dayjs().hour(19), dayjs().endOf("day"))) {
        return "bedtime";
    } else {
        return null; // Fallback if none of the conditions are met
    }
}