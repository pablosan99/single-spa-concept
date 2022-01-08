const Root = (props) => {
  return (
    <section>
      <div>HEADER {props.name} is mounted!</div>
      <div className="className">test message in header</div>
    </section>
  );
};

export default Root;
