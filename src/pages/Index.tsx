import '../css/LandingPage.css';
import Header from "../components/Header";
import image from "../assets/image.png"

function LandingPage() {
  return (
    <>
      <div className='page-preview'>
      <Header />

        <h1>Create test data for SQL in quick and easy manner</h1>
        <img src={image} alt="placeholder" className='preview-content' />
        <div className='preview-text'>
          <h2>
            Generate Test Data Effortlessly with Our SQL Data Generator
          </h2>
          <p>
            Our SQL data generator allows you to create realistic and customizable test data with just a few simple tweaks.
            You can quickly generate large volumes of data tailored to your specific needs.
          </p>
          <p>
            Supported output formats include <strong>JSON</strong>, <strong>CSV</strong>, and <strong>SQL</strong>, ensuring compatibility with a wide range of systems and workflows.
            Simply adjust the data structure, specify the format, and get your test data ready in no time.
          </p>
          <p>
            Save time, improve testing efficiency, and focus on building better solutions with our powerful data generation tool.
          </p>
        </div>
      </div>


    </>
  );
}

export default LandingPage;
