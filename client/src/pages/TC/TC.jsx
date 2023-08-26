import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./TC.scss";

const TC = () => {
  return (
    <div className="tcContainer">
      <Navbar />
      <Header />
      <div className="tcWrapper">
        <div className="infoContainer">
          <h1>Terms & Conditions</h1>
          <p>
            Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Lorem ipsum dolor sit amet consectetur. Posuere risus
            vitae rhoncus dui sollicitudin maecenas. Posuere nisl pulvinar in
            quam platea vitae purus neque. Feugiat congue viverra odio amet
            hendrerit dolor amet sagittis. Odio eget nibh leo vel. Donec nisl
            sed rhoncus duis est. Eu nunc pellentesque quis tincidunt eget
            imperdiet. Lorem ipsum dolor sit amet consectetur. A semper iaculis
            congue nascetur ut congue. Gravida amet at in sit. Bibendum
            ultricies adipiscing platea vel commodo sit in. Nibh justo odio
            rhoncus arcu ligula. Mi in sed sit tempor donec mi adipiscing
            sodales quisque. Massa vel consequat sed turpis ac. Duis vestibulum.
          </p>
        </div>

        <div className="infoContainer">
          <h1>Privacy Policy</h1>
          <p>
            Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Lorem ipsum dolor sit amet consectetur. Posuere risus
            vitae rhoncus dui sollicitudin maecenas. Posuere nisl pulvinar in
            quam platea vitae purus neque. Feugiat congue viverra odio amet
            hendrerit dolor amet sagittis. Odio eget nibh leo vel. Donec nisl
            sed rhoncus duis est. Eu nunc pellentesque quis tincidunt eget
            imperdiet. Lorem ipsum dolor sit amet consectetur. A semper iaculis
            congue nascetur ut congue. Gravida amet at in sit. Bibendum
            ultricies adipiscing platea vel commodo sit in. Nibh justo odio
            rhoncus arcu ligula. Mi in sed sit tempor donec mi adipiscing
            sodales quisque. Massa vel consequat sed turpis ac. Duis vestibulum.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TC;
