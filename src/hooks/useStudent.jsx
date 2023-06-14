import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useStudent = () => {
  const { user, loading } = useContext(AuthContext);
  const [isStudent, setIsStudent] = useState(false);
  const [isStudentLoading, setIsStudentLoading] = useState(true);

  useEffect(() => {
    const fetchStudentStatus = async () => {
      try {
        if (!loading && user) {
          const response = await fetch(`https://survival-skills-school.vercel.app/users/student/${user.email}`);
          const data = await response.json();
          setIsStudent(data.student);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsStudentLoading(false);
      }
    };

    fetchStudentStatus();
  }, [loading, user]);

  return [isStudent, isStudentLoading];
};

export default useStudent;
