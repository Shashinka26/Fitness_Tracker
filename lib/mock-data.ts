// Mock workout data
export const workouts = [
  {
    id: "1",
    name: "Upper Body Strength",
    type: "strength",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    duration: 65, // minutes
    notes: "Felt good, increased bench press weight",
    exercises: [
      {
        id: "1",
        name: "Bench Press",
        sets: [
          { id: "1", reps: 10, weight: 60 },
          { id: "2", reps: 8, weight: 70 },
          { id: "3", reps: 6, weight: 80 },
        ],
      },
      {
        id: "2",
        name: "Pull-ups",
        sets: [
          { id: "4", reps: 8, weight: 0 },
          { id: "5", reps: 8, weight: 0 },
          { id: "6", reps: 6, weight: 0 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "HIIT Session",
    type: "hiit",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    duration: 30, // minutes
    notes: "Intense session, kept heart rate high",
    exercises: [
      {
        id: "3",
        name: "Burpees",
        sets: [
          { id: "7", reps: 15, weight: 0 },
          { id: "8", reps: 15, weight: 0 },
          { id: "9", reps: 15, weight: 0 },
        ],
      },
      {
        id: "4",
        name: "Mountain Climbers",
        sets: [
          { id: "10", reps: 30, weight: 0 },
          { id: "11", reps: 30, weight: 0 },
          { id: "12", reps: 30, weight: 0 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Leg Day",
    type: "strength",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    duration: 75, // minutes
    notes: "Focused on form for squats",
    exercises: [
      {
        id: "5",
        name: "Squats",
        sets: [
          { id: "13", reps: 12, weight: 80 },
          { id: "14", reps: 10, weight: 90 },
          { id: "15", reps: 8, weight: 100 },
        ],
      },
      {
        id: "6",
        name: "Deadlifts",
        sets: [
          { id: "16", reps: 10, weight: 100 },
          { id: "17", reps: 8, weight: 110 },
          { id: "18", reps: 6, weight: 120 },
        ],
      },
    ],
  },
]

// Mock body measurements
export const bodyMeasurements = [
  {
    id: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    weight: 85.5,
    bodyFat: 18.5,
    chest: 102.0,
    waist: 88.0,
    hips: 95.0,
    arms: 38.0,
    thighs: 60.0,
  },
  {
    id: "2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23), // 23 days ago
    weight: 84.8,
    bodyFat: 18.0,
    chest: 102.0,
    waist: 87.5,
    hips: 94.5,
    arms: 38.2,
    thighs: 60.0,
  },
  {
    id: "3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16), // 16 days ago
    weight: 84.2,
    bodyFat: 17.8,
    chest: 102.5,
    waist: 87.0,
    hips: 94.0,
    arms: 38.5,
    thighs: 60.5,
  },
  {
    id: "4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), // 9 days ago
    weight: 83.5,
    bodyFat: 17.5,
    chest: 103.0,
    waist: 86.5,
    hips: 93.5,
    arms: 39.0,
    thighs: 61.0,
  },
  {
    id: "5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    weight: 83.0,
    bodyFat: 17.0,
    chest: 103.5,
    waist: 86.0,
    hips: 93.0,
    arms: 39.5,
    thighs: 61.5,
  },
]

// Mock exercise library
export const exerciseLibrary = [
  {
    id: "1",
    name: "Bench Press",
    muscleGroup: "Chest",
    description: "Lie on a flat bench with a barbell at chest level. Push the weight upward until arms are extended.",
    difficulty: "Intermediate",
    equipment: "Barbell, Bench",
    videoUrl: "https://example.com/bench-press",
  },
  {
    id: "2",
    name: "Squats",
    muscleGroup: "Legs",
    description:
      "Stand with feet shoulder-width apart, barbell on shoulders. Bend knees to lower body, then return to standing.",
    difficulty: "Intermediate",
    equipment: "Barbell, Squat Rack",
    videoUrl: "https://example.com/squats",
  },
  {
    id: "3",
    name: "Deadlift",
    muscleGroup: "Back",
    description:
      "Stand with feet shoulder-width apart, bend at hips and knees to grip barbell. Lift by extending hips and knees.",
    difficulty: "Advanced",
    equipment: "Barbell",
    videoUrl: "https://example.com/deadlift",
  },
  {
    id: "4",
    name: "Pull-ups",
    muscleGroup: "Back",
    description: "Hang from a bar with palms facing away. Pull body up until chin is over the bar.",
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    videoUrl: "https://example.com/pull-ups",
  },
  {
    id: "5",
    name: "Push-ups",
    muscleGroup: "Chest",
    description:
      "Start in plank position with hands shoulder-width apart. Lower body until chest nearly touches floor, then push back up.",
    difficulty: "Beginner",
    equipment: "None",
    videoUrl: "https://example.com/push-ups",
  },
  {
    id: "6",
    name: "Lunges",
    muscleGroup: "Legs",
    description:
      "Stand with feet together. Step forward with one leg and lower body until both knees are bent at 90 degrees.",
    difficulty: "Beginner",
    equipment: "None (or Dumbbells)",
    videoUrl: "https://example.com/lunges",
  },
  {
    id: "7",
    name: "Shoulder Press",
    muscleGroup: "Shoulders",
    description: "Sit or stand with dumbbells at shoulder height. Press weights upward until arms are extended.",
    difficulty: "Intermediate",
    equipment: "Dumbbells",
    videoUrl: "https://example.com/shoulder-press",
  },
  {
    id: "8",
    name: "Bicep Curls",
    muscleGroup: "Arms",
    description: "Stand with dumbbells at sides, palms facing forward. Curl weights toward shoulders.",
    difficulty: "Beginner",
    equipment: "Dumbbells",
    videoUrl: "https://example.com/bicep-curls",
  },
  {
    id: "9",
    name: "Tricep Dips",
    muscleGroup: "Arms",
    description:
      "Sit on edge of bench, hands gripping edge. Slide buttocks off bench and lower body by bending elbows.",
    difficulty: "Beginner",
    equipment: "Bench",
    videoUrl: "https://example.com/tricep-dips",
  },
  {
    id: "10",
    name: "Plank",
    muscleGroup: "Core",
    description: "Hold a push-up position with body in a straight line from head to heels.",
    difficulty: "Beginner",
    equipment: "None",
    videoUrl: "https://example.com/plank",
  },
]

// Mock workout plans
export const workoutPlans = [
  {
    id: "1",
    name: "Beginner Strength Training",
    description: "A 4-week program designed for beginners to build foundational strength",
    level: "Beginner",
    duration: "4 weeks",
    frequency: "3 days per week",
    workouts: [
      {
        day: 1,
        name: "Full Body Workout A",
        exercises: [
          { name: "Squats", sets: 3, reps: "10-12" },
          { name: "Push-ups", sets: 3, reps: "10-12" },
          { name: "Bent-over Rows", sets: 3, reps: "10-12" },
          { name: "Plank", sets: 3, reps: "30 seconds" },
        ],
      },
      {
        day: 2,
        name: "Rest Day",
        exercises: [],
      },
      {
        day: 3,
        name: "Full Body Workout B",
        exercises: [
          { name: "Lunges", sets: 3, reps: "10-12 each leg" },
          { name: "Shoulder Press", sets: 3, reps: "10-12" },
          { name: "Pull-ups or Assisted Pull-ups", sets: 3, reps: "8-10" },
          { name: "Russian Twists", sets: 3, reps: "15 each side" },
        ],
      },
      {
        day: 4,
        name: "Rest Day",
        exercises: [],
      },
      {
        day: 5,
        name: "Full Body Workout C",
        exercises: [
          { name: "Deadlifts", sets: 3, reps: "10-12" },
          { name: "Bench Press", sets: 3, reps: "10-12" },
          { name: "Lat Pulldowns", sets: 3, reps: "10-12" },
          { name: "Bicycle Crunches", sets: 3, reps: "15 each side" },
        ],
      },
      {
        day: 6,
        name: "Rest Day",
        exercises: [],
      },
      {
        day: 7,
        name: "Rest Day",
        exercises: [],
      },
    ],
  },
  {
    id: "2",
    name: "HIIT Fat Burner",
    description: "A high-intensity interval training program to maximize calorie burn",
    level: "Intermediate",
    duration: "4 weeks",
    frequency: "4 days per week",
    workouts: [
      {
        day: 1,
        name: "HIIT Cardio",
        exercises: [
          { name: "Jumping Jacks", sets: 1, reps: "30 seconds on, 15 seconds rest" },
          { name: "Mountain Climbers", sets: 1, reps: "30 seconds on, 15 seconds rest" },
          { name: "Burpees", sets: 1, reps: "30 seconds on, 15 seconds rest" },
          { name: "High Knees", sets: 1, reps: "30 seconds on, 15 seconds rest" },
          { name: "Repeat circuit 4 times", sets: 0, reps: "" },
        ],
      },
      {
        day: 2,
        name: "Strength Training",
        exercises: [
          { name: "Squats", sets: 3, reps: "15" },
          { name: "Push-ups", sets: 3, reps: "15" },
          { name: "Bent-over Rows", sets: 3, reps: "15" },
          { name: "Lunges", sets: 3, reps: "15 each leg" },
        ],
      },
      {
        day: 3,
        name: "Rest Day",
        exercises: [],
      },
      {
        day: 4,
        name: "Tabata Workout",
        exercises: [
          { name: "Squat Jumps", sets: 1, reps: "20 seconds on, 10 seconds rest" },
          { name: "Push-ups", sets: 1, reps: "20 seconds on, 10 seconds rest" },
          { name: "Bicycle Crunches", sets: 1, reps: "20 seconds on, 10 seconds rest" },
          { name: "Mountain Climbers", sets: 1, reps: "20 seconds on, 10 seconds rest" },
          { name: "Repeat circuit 8 times", sets: 0, reps: "" },
        ],
      },
      {
        day: 5,
        name: "Strength Training",
        exercises: [
          { name: "Deadlifts", sets: 3, reps: "15" },
          { name: "Shoulder Press", sets: 3, reps: "15" },
          { name: "Pull-ups or Assisted Pull-ups", sets: 3, reps: "12" },
          { name: "Plank", sets: 3, reps: "45 seconds" },
        ],
      },
      {
        day: 6,
        name: "HIIT Cardio",
        exercises: [
          { name: "Jumping Jacks", sets: 1, reps: "40 seconds on, 20 seconds rest" },
          { name: "Burpees", sets: 1, reps: "40 seconds on, 20 seconds rest" },
          { name: "Mountain Climbers", sets: 1, reps: "40 seconds on, 20 seconds rest" },
          { name: "High Knees", sets: 1, reps: "40 seconds on, 20 seconds rest" },
          { name: "Repeat circuit 3 times", sets: 0, reps: "" },
        ],
      },
      {
        day: 7,
        name: "Rest Day",
        exercises: [],
      },
    ],
  },
]

// Mock nutrition data
export const nutritionData = {
  dailyCalories: 2200,
  macros: {
    protein: 165, // grams
    carbs: 220, // grams
    fat: 73, // grams
  },
  meals: [
    {
      name: "Breakfast",
      calories: 550,
      foods: [
        { name: "Oatmeal", portion: "1 cup", calories: 300, protein: 10, carbs: 50, fat: 5 },
        { name: "Banana", portion: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
        { name: "Almond Butter", portion: "1 tbsp", calories: 100, protein: 3, carbs: 3, fat: 9 },
        { name: "Greek Yogurt", portion: "1/2 cup", calories: 45, protein: 8, carbs: 3, fat: 0 },
      ],
    },
    {
      name: "Lunch",
      calories: 650,
      foods: [
        { name: "Grilled Chicken Breast", portion: "5 oz", calories: 250, protein: 35, carbs: 0, fat: 10 },
        { name: "Brown Rice", portion: "1 cup", calories: 220, protein: 5, carbs: 45, fat: 2 },
        { name: "Mixed Vegetables", portion: "1 cup", calories: 80, protein: 4, carbs: 15, fat: 1 },
        { name: "Olive Oil", portion: "1 tbsp", calories: 120, protein: 0, carbs: 0, fat: 14 },
      ],
    },
    {
      name: "Snack",
      calories: 300,
      foods: [
        { name: "Protein Shake", portion: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 },
        { name: "Apple", portion: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
        { name: "Almonds", portion: "1 oz", calories: 160, protein: 6, carbs: 6, fat: 14 },
      ],
    },
    {
      name: "Dinner",
      calories: 700,
      foods: [
        { name: "Salmon", portion: "6 oz", calories: 350, protein: 34, carbs: 0, fat: 20 },
        { name: "Sweet Potato", portion: "1 medium", calories: 100, protein: 2, carbs: 23, fat: 0 },
        { name: "Broccoli", portion: "1 cup", calories: 55, protein: 4, carbs: 10, fat: 0 },
        { name: "Quinoa", portion: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
        { name: "Avocado", portion: "1/4", calories: 85, protein: 1, carbs: 4, fat: 8 },
      ],
    },
  ],
}
