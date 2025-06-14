export default function CartIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        className="fill-current opacity-40"
        d="M6.75 15.75a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0ZM12.75 15.75a1.125 1.125 0 1 0 2.25 0 1.125 1.125 0 0 0-2.25 0Z"
      />
      <path
        fill="currentColor"
        d="M3 2.25A.75.75 0 0 1 3.75 1.5h1.636a.75.75 0 0 1 .728.573l.302 1.177H15a.75.75 0 0 1 .725.917l-1.125 5.25a.75.75 0 0 1-.725.583H7.522l-.302 1.5h7.53a.75.75 0 1 1 0 1.5H6.75a.75.75 0 0 1-.728-.927l.844-4.198-1.716-6.693H3.75A.75.75 0 0 1 3 2.25Z"
      />
    </svg>
  );
}
