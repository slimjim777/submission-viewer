/*
 * Copyright (C) 2016-2017 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
'use strict'
var React = require('react');


var ArrayKeyValues = React.createClass({

	renderKeyValues: function(o, i) {
		return Object.keys(o).map(function(key) {
			i += 1;
			return (
				<tr key={i}>
					<td>{key}</td><td>{o[key]}</td>
				</tr>
			)
		});
	},

	render: function() {
		var self = this;
		var i = this.props.index;
		var onOff = false;

		return (
			<div className="twelve-col">
				<h2>{this.props.title}</h2>
				<table>
						{this.props.section.map(function(o) {
								i += 1;
								onOff = !onOff;
								return (
									<tbody key={i} className={onOff ? 'shaded' : 'unshaded'}>
										{self.renderKeyValues(o, i)}
									</tbody>
								);
						})}
				</table>
			</div>
		);
	}
});

module.exports = ArrayKeyValues;
