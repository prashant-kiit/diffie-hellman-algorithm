function Welcome({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleLogout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    if (isLoggedIn) setIsLoggedIn(false);
  }

  return (
    <div className="welcome">
      <h3>Welcome</h3>
      <p>Content</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Welcome;
