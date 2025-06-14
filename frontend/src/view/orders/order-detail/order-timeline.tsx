import React, { useState } from 'react';
import { FiHash, FiLink2, FiMoreHorizontal, FiSmile } from 'react-icons/fi';
import { Input } from 'rizzui';

const Timeline = () => {
  const [comment, setComment] = useState('');
  interface Comment {
    id: number;
    author: string;
    text: string;
    time: string;
    date: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [activities] = useState([
    {
      text: 'You added payment terms to this order.',
      time: '1:59 AM',
      date: 'January 20'
    },
    {
      text: 'Confirmation #Z0AQX9TRF was generated for this order.',
      time: '1:59 AM',
      date: 'January 20'
    },
    {
      text: 'You created this order from draft order #D42.',
      time: '1:59 AM',
      date: 'January 20'
    }
  ]);

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: 'Ali Imran',
        text: comment,
        time: 'Just now',
        date: 'Today'
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <div className="flex gap-3 bg-white p-3 rounded-lg shadow-md">
          <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center text-white">
            AI
          </div>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Leave a comment..."
              className="w-full outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {/* <Input type='text' placeholder='Leave a comment...' className="w-full outline-none" value={comment}
            onChange={(e) => setComment(e.target.value)}/> */}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiSmile className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <FiHash className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <FiLink2 className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <button
              className={`px-4 py-1 rounded ${
                comment.trim() 
                  ? 'bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleAddComment}
              disabled={!comment.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center text-white">
              AI
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 text-sm ml-2">{comment.time}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}

        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 text-gray-600">
              <span>{activity.text}</span>
              <span className="text-gray-400 text-sm ml-2">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;