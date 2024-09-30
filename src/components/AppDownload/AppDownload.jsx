
import { imageIcon } from '../../constants/image-icon';
import './AppDownloadStyle.css';

const AppDownload = () => {
  return (
    <div className='app-download' id='mobile app'>
      <p>For Better Experience Download <br /> Our App Now</p>
      <div className="app-download-platforms">
        <img src={imageIcon.play_store} alt="" />
        <img src={imageIcon.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;