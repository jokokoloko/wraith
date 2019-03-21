import React from 'react';
import PropTypes from 'prop-types';
import { paragraphify } from '../../function';
import IconLane from './IconLane';

const LoopNote = ({ collection, note, type }) =>
    collection.map((lane, index) => {
        const count = index + 1;
        const { champion, position } = lane;
        const content = note.lanes[position];
        return (
            content && (
                <article
                    key={`note-${type}-${position}`}
                    id={`note-${type}-${position}`}
                    className={`note-${type} note-${type}-${count} champion-${champion ? champion.id : 'none'} node-xs-50`}
                >
                    <header className="d-flex align-items-center node-xs-30">
                        <IconLane position={type === 'ban' ? 'ban' : position} />
                        <h4 className="champion-name">{champion.name}</h4>
                    </header>
                    <section className="node-xs-30">{paragraphify(content)}</section>
                </article>
            )
        );
    });

LoopNote.propTypes = {
    collection: PropTypes.arrayOf(PropTypes.object).isRequired,
    note: PropTypes.objectOf(PropTypes.any).isRequired,
    type: PropTypes.string.isRequired,
};

export default LoopNote;
