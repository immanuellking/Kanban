import Image from "next/image";

export default function Logo() {
  return (
    <div className="pl-6">
      <Image
        src="/logo-light.svg"
        alt="logo"
        width={155}
        priority
        height={26}
      />
    </div>
  );
}
