import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isInstructorLoading, setIsInstructorLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorStatus = async () => {
      try {
        if (!loading && user) {
          const response = await fetch(`http://localhost:5000/users/instructor/${user.email}`);
          const data = await response.json();
          setIsInstructor(data.instructor);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsInstructorLoading(false);
      }
    };

    fetchInstructorStatus();
  }, [loading, user]);

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
