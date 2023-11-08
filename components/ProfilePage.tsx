import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";

import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => {
  const n = user?.projects?.edges?.length - 1;
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween mt-20 max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatarUrl}
            width={150}
            height={150}
            className="rounded-full"
            alt="user image"
          />
          {user?.isVerified ? (
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-bold mt-10">{user?.name} </p>
              <Image
                src="/verified.png"
                width={100}
                height={100}
                alt="Regular"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-bold mt-10">{user?.name} </p>
              <Image
                src="/regular.png"
                width={100}
                height={100}
                alt="Regular"
                className="rounded-full"
              />
            </div>
          )}

          <div className="flex flex-col mt-8 w-full flex-wrap">
            <p className="font-montserrat text-xs">Click below to send mail</p>
            <Link href={`mailto:${user?.email}`}>
              <p className="hover-text font-montserrat text-lg">
                {user?.email}
              </p>
            </Link>
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[n]?.node?.image}
            alt="project image"
            width={339}
            height={354}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/samplepic.png"
            width={539}
            height={354}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="text-center mb-5 text-gray-50 bg-black-100 w-full rounded-full text-lg font-poppins font-semibold">
          {user?.name}'s Recent Projects
        </p>

        <div className="profile_projects">
          {user?.projects?.edges?.map(
            ({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                avatarUrl={user.avatarUrl}
                userId={user.id}
              />
            )
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
