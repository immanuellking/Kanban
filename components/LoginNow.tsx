import { useRouter } from "next/navigation";

export default function LoginNow() {
  const { push } = useRouter();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-8">
      <h4 className="text-xl font-semibold text-[#828fa3]">
        Please sign in to enjoy the Kanban app
      </h4>
      <button
        className="bg-[#635FC7] w-[20rem] hover:bg-[#a8a4ff] transition-all ease-in-out duration-500 py-4 text-white font-semibold rounded-full"
        onClick={() => push("/login")}
      >
        Login Now
      </button>
    </div>
  );
}
