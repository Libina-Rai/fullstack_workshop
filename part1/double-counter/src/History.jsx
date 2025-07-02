const History = ({ history }) => {
  if (history.length > 0) {
    return <div>click history: {history.join(" ")}</div>;
  }
  return <p>no history yet</p>;
};
export default History;
