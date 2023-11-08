"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteProject, fetchToken } from "@/lib/actions";

type Props = {
  projectId: string;
};

const ProjectActions = ({ projectId }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter   border border-green-500 font-quantico  hover:text-green-500 text-black-100  rounded-full px-2"
      >
        Edit
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter border rounded-full px-2  text-base font-quantico  hover:text-red-500  border-red-500 ${
          isDeleting ? "bg-gray text-white" : "text-black-100"
        }`}
        onClick={handleDeleteProject}
      >
        Delete
      </button>
    </>
  );
};

export default ProjectActions;
