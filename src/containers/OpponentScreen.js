import React, { Fragment } from 'react';

const OpponentScreen = ({ opponent }) => (
  <div className="opponent-battle-screen">
    {opponent === 'none' ? (
      <Fragment>
        <div>None</div>
      </Fragment>
    ) : (
      <Fragment>
        <div className={`opponent-battle-image ${opponent.name}`} />

        <div>
          <p className="text-center">
            <span className="opponent-name">{opponent.name}</span>
          </p>
          <div className="panel-bar health-bar">
            <p>HP: {`${opponent.currentHP} / ${opponent.maxHP}`}</p>
            <div
              style={{
                width: `${Math.floor(
                  100 - opponent.currentHP / opponent.maxHP * 100,
                )}%`,
              }}
              className="damage"
            />
          </div>
          <div className="effect-box">
            <p>Current effects: {opponent.effects.length === 0 && 'none'}</p>
            {opponent.effects.map((effect, i) => (
              <div key={i} className="flex-row">
                <div className={`battle-effect effect-${effect.name}`} />

                <p className="center">{`${effect.name}: ${
                  effect.duration
                } turns`}</p>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    )}
  </div>
);

export default OpponentScreen;
