"use client";
import { useRouter } from "next/navigation";


export default function BoardContainer({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const { push } = useRouter();

  return (
    <section className="w-full h-full  bg-[#20212C]">
      {!isSignedIn ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
          <h4 className="text-xl font-semibold text-[#828fa3]">
            Please sign in to enjoy the Kanban app
          </h4>
          <button
            className="bg-[#635FC7] w-[20rem] py-3 text-white font-semibold rounded-full"
            onClick={() => push("/login")}
          >
            Login Now
          </button>
        </div>
      ) : (
        <div>Board Container</div>
      )}
    </section>
  );
}
