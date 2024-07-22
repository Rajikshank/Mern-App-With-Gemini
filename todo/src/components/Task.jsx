export default function Task(props) {
  return (
    <>
      <div className="m-6 p-6 rounded-md bg-zinc-600 ">
        <div>{props.task}</div>
      </div>
    </>
  );
}
