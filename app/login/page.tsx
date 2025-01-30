"use client"; // Required for Next.js App Router (if using pages, remove this)

import { useEffect, useState } from "react";
import liff from "@line/liff";
import Image from "next/image";

interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

const LineLogin: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "YOUR_LIFF_ID" }); // Replace with your actual LIFF ID

        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile();
          setUserProfile(profile);
        }
      } catch (err) {
        setError("LIFF initialization failed: " + (err as Error).message);
      }
    };

    initLiff();
  }, []);

  const handleLogout = () => {
    liff.logout();
    setUserProfile(null);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {userProfile ? (
        <div className="text-center">
          {userProfile.pictureUrl && (
            <Image
              src={userProfile.pictureUrl}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
              priority // Optimize for faster loading
            />
          )}
          <h2 className="text-2xl font-semibold mt-4">
            Welcome, {userProfile.displayName}!
          </h2>
          {userProfile.statusMessage && (
            <p className="text-gray-600">{userProfile.statusMessage}</p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Logging in...</p>
      )}
    </div>
  );
};

export default LineLogin;
