import { Red } from '@/components/styles/JavaScriptNotesStyles';
import { TOC } from '@/components/styles/TOC';
import styles from './style.module.css';

export default function HotTips() {
  return (
    <div>
      <p>WHAT</p>
      <TOC>
        <p>WHAT</p>
      </TOC>
      <Red>
        <p>WHAT slow?????</p>
      </Red>
      <div className={styles.red}>
        <p>This is via a CSS module!</p>
      </div>
      {/* <BlueSkyPost/> */}
    </div>
  );
}
