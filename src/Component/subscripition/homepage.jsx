import React from 'react';
import { Container } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import Course from './course';
import { IMAGES } from '../locales/images';

export default function Homepage () {
  return (
    <div>
      <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.ABOUTUS_BANNER})`, height: 400 }} />
      <Container fluid className="p-0 m-0">
        <div className="shadow-lg">
          <Card className="p-4">
            <div className="text-center justify-content-center p-2 m-2">
              <h2 className="text-danger justify-content-center d-flex">The Best of the wiculty, for the Best</h2>
              <p>This course is specially designed (includes special modules)</p>
              <Container className="text-center justify-content-center Container">
                {`Wicultys DevOps training certification course will
                help you master DevOps from scratch to advance
                level with real-time projects and trending topic such as DevSecOps.
                This course provides work integrated learning so that you
                can change your domain to DevOps or start working on your existing real-time
                project from the day-1 working on your existing real-time.`}
              </Container>
            </div>
          </Card>
        </div>
      </Container>
      <div>
        <Course />
      </div>
    </div>
  );
}
