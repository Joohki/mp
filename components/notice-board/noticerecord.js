import classes from './noticerecord.module.css'
import {useState} from 'react'
function NoticeList() {
    const [activeTab, setActiveTab] = useState('')
    
  return (
    <div className={classes.post_navigation}>
      <div
        role="presentation"
        onClick={()=>{setActiveTab('all')}}
        className={activeTab === "all" ? classes.active : ""}
      >
        전체
      </div>
      <div
        role="presentation"
        onClick={()=>{setActiveTab('my'); }}
        className={activeTab === "my" ? classes.active : ""}
      >
        나의 글
      </div>
    </div>
  );
}
export default NoticeList;
