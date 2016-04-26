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
var Dropzone = require('react-dropzone');
var ArrayKeyValues = require('./ArrayKeyValues');
var KeyValues = require('./KeyValues');

var MAX_SIZE = 100;

var Index = React.createClass({
	getInitialState: function() {
		return {submission: {resource_map:{}, result_map:{}}}
	},

	handleDrop: function(files) {
  },

  handleDropAccepted: function(files) {
    var f = files[0];
    this.processSubmissionFile(f);
  },

	processSubmissionFile: function(file) {
    var self = this;
    var reader = new FileReader();

    reader.onload = function(upload) {
			var data = upload.target.result.split(',')[1];
			var json = JSON.parse(atob(data));
			self.setState({submission: json});
    }

    reader.readAsDataURL(file);
  },

  render: function() {
		var self = this;
		var index = 0;

    return (
        <div className="inner-wrapper">

          <section className="row no-border">
            <h2>Submission</h2>
						<div>
							<div className="twelve-col">
								<Dropzone className="dropzone" onDrop={this.handleDrop} onDropAccepted={this.handleDropAccepted}
									multiple={false} accept={'application/json,text/*,.json'}
									maxFilesize={MAX_SIZE}>
									<div>Drop a JSON submission file here, or click to select a file to upload.</div>
								</Dropzone>
							</div>
						</div>
						<h3>Resources</h3>
              {
								Object.keys(this.state.submission.resource_map).map(function(key) {
									index += 1;
									if (key !== '2013.com.canonical.certification::package') {
										if (Array.isArray(self.state.submission.resource_map[key])) {
											return <ArrayKeyValues key={index} title={key} section={self.state.submission.resource_map[key]} index={index} />;
										} else {
											return <KeyValues key={index} title={key} section={self.state.submission.resource_map[key]} index={index} />;
										}
									}
								})
							}

							<h3>Results</h3>
							{
								Object.keys(this.state.submission.result_map).map(function(key) {
									index += 1;
									if (key !== '2013.com.canonical.certification::package') {
											return <KeyValues key={index} title={key} section={self.state.submission.result_map[key]} index={index} />;
									}
								})
							}
          </section>

        </div>
    );
  }
});

module.exports = Index;
