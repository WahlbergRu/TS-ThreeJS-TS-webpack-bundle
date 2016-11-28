/**
 * Created by Wahlberg on 28.11.2016.
 */

import {Game}  from './game/game';
import CubicGrid from './elements/cubic-grid';
import Grid from './elements/grid';

Game.init();
Game.component(Grid);
Game.component(CubicGrid);