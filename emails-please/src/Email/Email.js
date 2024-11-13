import React from 'react';
import './Email.css';

function Email() {
    return (
        <div className="email-viewer">
            <div className="email-header">
                This is the email header content
            </div>
            <div className="email-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id
                    neque ut ipsum consequat dapibus. Vivamus nec eros ut felis euismod
                    tincidunt. Integer id mi nec lorem vehicula volutpat a a leo. Etiam
                    feugiat felis nec enim varius, at interdum sapien luctus.
                </p>
                <p>
                    Phasellus ac felis vel justo euismod vehicula. Suspendisse quis
                    molestie augue. Nulla vestibulum ex at mi tristique gravida.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. In fringilla ipsum ut nisl dignissim, vel
                    vehicula ex bibendum.
                </p>
                <div className="image-placeholder">Image</div>
            </div>
        </div>
    );
}

export default Email;