import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';

function BlogPostCard({ title, description, postId }) {

  //links to detail page of post
  return (
    <div>
      <Card body outline color="secondary">
        <Link to={`/${postId}`} >
          <CardTitle>{title}</CardTitle>
        </Link >
        <CardText>{description}</CardText>
      </Card>
    </div>
  );
}

export default BlogPostCard;