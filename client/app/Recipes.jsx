import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import './stylesheets/recipes.css';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: '20px',
        width: '60%',
        margin: 'auto'
    },
    gridList: {
        overflowY: 'auto',
        cursor: 'pointer'
    }
};

class Recipes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style={styles.root}>
                <GridList
                    cols={2}
                    cellHeight={200}
                    padding={1}
                    style={styles.gridList}
                >
                    {this.props.recipes.map((tile) => (
                        <GridTile
                            key={tile._id}
                            title={tile.name}
                            subtitle={this.getSubtitle(tile.ingredients)}
                            actionPosition="right"
                            actionPosition="left"
                            titlePosition="bottom"
                            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            onClick={this.onTileClick.bind(this, tile.recipe_url)}
                        >
                            <img src={`images/${tile.image}`} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }

    onTileClick(data) {
        window.open(data);
    }

    getSubtitle(ingredients) {
        if (ingredients.length !== 0) {
            return (<span><span className="tile-icon">{ingredients.length}</span>
                            Missing ingredients: <b>{ingredients.toString()}</b></span>);
        } else {
            return <span><b>No missing ingredients!</b></span>;
        }
    }
}

export default Recipes;