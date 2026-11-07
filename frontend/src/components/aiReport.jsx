
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../style/aiReport.css'
import Loader from "./loader";

export default function AIReport({ isAIresAvail,response, onClose }) {
  return (
    <div className="report-overlay" >
      <div
        className="report-modal"
        onClick={(e) => e.stopPropagation()}
      >
    
          {isAIresAvail?(
            <>
                <div className="report-header">
                    <div>
                        <h2>AI Health Insights</h2>
                        <p>Your personalized cardiovascular report</p>
                    </div>

                    <button onClick={onClose} className="close-btn">
                        ✕
                    </button>
                </div>

                <div className="report-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response}
                </ReactMarkdown>
                </div>

                <div className="report-footer">
                <span>AI-generated health information</span>
                <button onClick={onClose}>Close Report</button>
                </div>
            </>
        ):(
            <Loader/>
        )}
        
      </div>
    </div>
  );
}
