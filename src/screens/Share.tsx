import { getTodayGoal, getIncrease } from '../data/goals';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import md5 from '../utils/md5';
import React from 'react';
import ShareComponent from '../components/ShareComponent';
import bs5 from 'bs5-toast';

function generateLink(name: string, goal: number, increase: number, gravatar?: string) {
  const pathWithoutQueryAndHash = window.location.href.split('#')[0].split('?')[0];
  return `${pathWithoutQueryAndHash}?name=${encodeURIComponent(name)}&goal=${goal}&increase=${increase}${gravatar ? '&gravatar=' + gravatar : ''}#/shared`;
}

export default function Share() {
  const linkRef = React.useRef<HTMLInputElement>();
  const [name, setName] = React.useState('John');
  const [gravatar, setGravatar] = React.useState(undefined);
  const goal = getTodayGoal();
  const increase = getIncrease();
  const generatedLink = generateLink(name, goal, increase, gravatar);
  const shareLink = React.useCallback(() => {
    if (navigator.share && typeof navigator.share === 'function') {
      navigator.share({
        url: generatedLink
      });
    } else {
      navigator.clipboard.writeText(generatedLink).then(function() {
        new bs5.Toast({
          body: 'Copied to clipboard',
          className: 'border-0 bg-success text-white',
          placement: 'bottom-right',
          btnCloseWhite: true,
        }).show();
      });
    }
  }, [generatedLink]);

  return (
    <React.Fragment>
      <h1>Share</h1>
      <p>Invite others to join you on your goal! The below form constructs a link you can share with others to invite them.</p>
      <Form>
        <Form.Group className="mb-3" controlId="gravatar">
          <Form.Label>Your <a href='https://en.gravatar.com/' target='_blank'>Gravatar</a> Email</Form.Label>
          <div className="text-muted mb-1">(optional) Only used to show your friendly face!</div>
          <Form.Control
            type="text"
            placeholder='john@doe.com'
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              setGravatar(e.currentTarget.value ? md5(e.currentTarget.value) : undefined)
            } />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder='John'
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => setName(e.currentTarget.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Link to Share</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={generatedLink}
              ref={linkRef}
              readOnly />
            <Button variant="primary" id="button-addon2" onClick={shareLink}>
              { navigator.share && typeof navigator.share === 'function' ? 'Share' : 'Copy' }
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
      <h2>Preview</h2>
      <ShareComponent gravatar={gravatar} name={name} goal={goal} increase={increase} onClick={shareLink} />
    </React.Fragment>
  );
}