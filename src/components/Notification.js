export default function Notify({ type, message }) {
  return (
    <div className={`my-20 alert alert-${type} alert-dismissible`} role="alert">
      {message}
    </div>
  );
}
