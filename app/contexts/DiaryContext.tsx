"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";

// Define the DiaryContext Type
interface DiaryContextType {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  activity: string;
  setActivity: React.Dispatch<React.SetStateAction<string>>;
  symptom: string;
  setSymptom: React.Dispatch<React.SetStateAction<string>>;
  painLevel: number;
  setPainLevel: React.Dispatch<React.SetStateAction<number>>;
  breakfastNote: string;
  setBreakfastNote: React.Dispatch<React.SetStateAction<string>>;
  lunchNote: string;
  setLunchNote: React.Dispatch<React.SetStateAction<string>>;
  dinnerNote: string;
  setDinnerNote: React.Dispatch<React.SetStateAction<string>>;
  symptomImage: string;
  setSymptomImage: React.Dispatch<React.SetStateAction<string>>;
  breakfastImage: string;
  setBreakfastImage: React.Dispatch<React.SetStateAction<string>>;
  lunchImage: string;
  setLunchImage: React.Dispatch<React.SetStateAction<string>>;
  dinnerImage: string;
  setDinnerImage: React.Dispatch<React.SetStateAction<string>>;
  diaryID: number | null;
  setDiaryID: React.Dispatch<React.SetStateAction<number | null>>;
  checkedFoods: boolean[];
  setCheckedFoods: React.Dispatch<React.SetStateAction<boolean[]>>;
  createDiary: () => Promise<void>;
  updateDiary: () => Promise<void>;
  uploadImage: () => Promise<void>;
}

// Create the context
const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

interface DiaryProviderProps {
  children: ReactNode;
}

export const DiaryProvider: React.FC<DiaryProviderProps> = ({ children }) => {
  // State hooks
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activity, setActivity] = useState<string>("");
  const [symptom, setSymptom] = useState<string>("");
  const [painLevel, setPainLevel] = useState<number>(1);
  const [breakfastNote, setBreakfastNote] = useState<string>("");
  const [lunchNote, setLunchNote] = useState<string>("");
  const [dinnerNote, setDinnerNote] = useState<string>("");
  const [symptomImage, setSymptomImage] = useState<string>("");
  const [breakfastImage, setBreakfastImage] = useState<string>("");
  const [lunchImage, setLunchImage] = useState<string>("");
  const [dinnerImage, setDinnerImage] = useState<string>("");
  const [diaryID, setDiaryID] = useState<number | null>(null);
  const [checkedFoods, setCheckedFoods] = useState<boolean[]>(Array(21).fill(false));
  const path = process.env.NEXT_PUBLIC_BACK_END;

  const getAuthToken = (): string | null => {
    const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const authToken = getAuthToken(); // Get the auth token
        const response = await fetch(`${path}/diaries/entry/${currentDate.toISOString().split("T")[0]}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`, // Add the token to the headers
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const { id, activity, symptom, painScore, breakfast, lunch, dinner, food } = result;

        // Update state with fetched data
        setDiaryID(id);
        setActivity(activity || "");
        setSymptom(symptom || "");
        setPainLevel(painScore || 1);
        setBreakfastNote(breakfast || "");
        setLunchNote(lunch || "");
        setDinnerNote(dinner || "");
        setCheckedFoods(food);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchDiary();
  }, [currentDate]);

  useEffect(() => {
    const fetchImage = async () => {
      const authToken = getAuthToken(); // Get the auth token
      try {
        console.log("Fetching image from:", path);
        console.log("diaryID: ", diaryID);
        const response = await fetch(`${path}/images/${diaryID}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`, // Add the token to the headers
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Data fetched:", result);

        for (const image of result) {
          switch (image.label) {
            case "symptom": {
              setSymptomImage(image.url);
              break;
            }
            case "breakfast": {
              setBreakfastImage(image.url);
              break;
            }
            case "lunch": {
              setLunchImage(image.url);
              break;
            }
            case "dinner": {
              setDinnerImage(image.url);
              break;
            }
            default: {
              console.log(`Unknown label: ${image.label}`);
            }
          }
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (diaryID) {
      fetchImage();
      uploadImage();
    }
  }, [diaryID]);

  // Upload images for the diary
  const uploadImage = useCallback(async () => {
    if (!diaryID) return;

    const authToken = getAuthToken(); // Get the auth token
    const imageUrls = [
      { url: symptomImage, filename: "symptom" },
      { url: breakfastImage, filename: "breakfast" },
      { url: lunchImage, filename: "lunch" },
      { url: dinnerImage, filename: "dinner" },
    ];

    const formData = new FormData();
    for (const { url, filename } of imageUrls) {
      if (url) {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], `${filename}.jpg`, { type: blob.type });
        formData.append("images", file);
      }
    }

    try {
      const response = await fetch(`${path}/images/${diaryID}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${authToken}`, // Add the token to the headers
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.log("Error uploading images:", error);
    }
  }, [
    diaryID,
    breakfastImage,
    dinnerImage,
    lunchImage,
    symptomImage,
    path,
  ]);

  // Create a new diary entry
  const createDiary = useCallback(async () => {
    const authToken = getAuthToken(); // Get the auth token
    try {
      const response = await fetch(`${path}/diaries/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Add the token to the headers
        },
        body: JSON.stringify({
          date: currentDate.toISOString().split("T")[0],
          activity,
          symptom,
          painScore: painLevel,
          breakfast: breakfastNote,
          lunch: lunchNote,
          dinner: dinnerNote,
          food: checkedFoods,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setDiaryID(result.id);
      // uploadImage(); // After creating diary, upload the images
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }, [path, currentDate, activity, symptom, painLevel, breakfastNote, lunchNote, dinnerNote, checkedFoods]);

  // Update an existing diary entry
  const updateDiary = useCallback(async () => {
    if (!diaryID) return;
    const authToken = getAuthToken(); // Get the auth token

    try {
      const response = await fetch(`${path}/diaries/update/${diaryID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Add the token to the headers
        },
        body: JSON.stringify({
          date: currentDate.toISOString().split("T")[0],
          activity,
          symptom,
          painScore: painLevel,
          breakfast: breakfastNote,
          lunch: lunchNote,
          dinner: dinnerNote,
          food: checkedFoods,
        }),
      });

      if (response.ok) {
        alert("Diary updated successfully!");
      } else {
        alert("Failed to update diary!");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }, [diaryID, path, currentDate, activity, symptom, painLevel, breakfastNote, lunchNote, dinnerNote, checkedFoods]);

  return (
    <DiaryContext.Provider value={{
      currentDate,
      setCurrentDate,
      activity,
      setActivity,
      symptom,
      setSymptom,
      painLevel,
      setPainLevel,
      breakfastNote,
      setBreakfastNote,
      lunchNote,
      setLunchNote,
      dinnerNote,
      setDinnerNote,
      symptomImage,
      setSymptomImage,
      breakfastImage,
      setBreakfastImage,
      lunchImage,
      setLunchImage,
      dinnerImage,
      setDinnerImage,
      diaryID,
      setDiaryID,
      checkedFoods,
      setCheckedFoods,
      createDiary,
      updateDiary,
      uploadImage
    }}>
      {children}
    </DiaryContext.Provider>
  );
};

// Custom hook to use the Diary context
export const useDiary = (): DiaryContextType => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return context;
};
