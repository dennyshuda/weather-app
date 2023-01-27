interface ContainerType {
  children: React.ReactNode;
}

export function Container({ children }: ContainerType) {
  return (
    <div className="flex justify-center items-center bg-blue-500 h-screen">
      {children}
    </div>
  );
}
