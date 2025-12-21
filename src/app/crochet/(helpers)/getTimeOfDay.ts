export const getDetailedTimeOfDay = (): {
  timeCategory: string;
  timeEmoji: string;
} => {
  const currentHour: number = new Date().getHours();

  let timeCategory: string = "";
  let timeEmoji: string = "";

  // Morning: 5:00 AM to 11:59 AM
  if (currentHour >= 5 && currentHour <= 11) {
    timeCategory = "Morning";
    timeEmoji = "☀️";
  }
  // Noon: 12:00 PM to 1:59 PM
  else if (currentHour >= 12 && currentHour <= 13) {
    timeCategory = "Noon";
    timeEmoji = "🔆";
  }
  // Afternoon: 2:00 PM to 4:59 PM
  else if (currentHour >= 14 && currentHour <= 16) {
    timeCategory = "Afternoon";
    timeEmoji = "🌇";
  }
  // Evening: 5:00 PM to 8:59 PM
  else if (currentHour >= 17 && currentHour <= 20) {
    timeCategory = "Evening";
    timeEmoji = "🌙";
  }
  // Night: 9:00 PM to 4:59 AM
  else {
    timeCategory = "Night";
    timeEmoji = "🌌";
  }

  return { timeCategory, timeEmoji };
};
