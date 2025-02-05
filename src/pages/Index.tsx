import '../css/LandingPage.css';
import Header from "../components/Header";
import image from "../assets/image.png"

function LandingPage() {
  return (
    <>
      <Header />
      <div className='page-preview'>
        <h1>Create test data for SQL in quick and easy manner</h1>
        <div className='preview-content'>
          <img src={image} alt="placeholder" />
        </div>
      </div>

    </>
  );
}

export default LandingPage;
