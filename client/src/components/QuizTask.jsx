import React, { PropTypes } from 'react';
import TimeSection from './TimeSection';
import AnswareSection from './AnswareSection';
import CodeOfTaskSection from './CodeOfTaskSection';

class QuizTask extends React.Component {
  constructor(props) {
    super(props);
    this.answareChanged = this.answareChanged.bind(this);
    this.getDomNodeFromCode = this.getDomNodeFromCode.bind(this);
    this.state = {
      codeDomObject: this.getDomNodeFromCode(),
    };
  }
  getDomNodeFromCode() {
    let code = this.props.quizTask.get('task').get('code');
    let codeLines = code.split('\n');
    codeLines = codeLines.map((line, index) => {
      const closeTagMatch = line.match(/<\/[a-zA-Z]+>/);
      if (closeTagMatch && line === closeTagMatch[0]) {
        return line;
      }
      const matchResult = line.match(/<[a-zA-Z]+/);
      const lastIndexOfTheMatch = matchResult.index + matchResult[0].length;
      const subStringBeforeMatchedElem = line.substring(0, lastIndexOfTheMatch);
      const subStringAfterMatchedElem = line.substring(lastIndexOfTheMatch, line.length);
      const numberOfLineAttr = ' data-line="' + index + '"';
      return subStringBeforeMatchedElem + numberOfLineAttr + subStringAfterMatchedElem;
    });
    code = codeLines.join('\n');
    const parser = new DOMParser();
    return parser.parseFromString(code, 'text/html');
  }
  answareChanged(selector) {
    console.log(selector);
    this.props.updateSelector(selector);
    try {
      const queryResults = this.state.codeDomObject.querySelectorAll(selector);
      console.log(queryResults);
      const currentAnswares = [];
      for (let i = 0, l = queryResults.length; i < l; i++) {
        currentAnswares.push(queryResults[i].getAttribute('data-line'));
      }
      if (currentAnswares.join(',') === this.props.quizTask.get('task').get('answare')) {
        this.context.passTest(true);
      }
    } catch (error) {
      console.log('QuerySelector error');
    }
  }
  render() {
    return (
      <div>
        <TimeSection
          deprecatedSymbols={
            this.props.quizTask.get('task') &&
            this.props.quizTask.get('task').get('deprecatedSymbols')
          }
          timeSpent={this.props.quizTask.get('timeSpent')}
        />
        <CodeOfTaskSection
          code={this.props.quizTask.get('task') && this.props.quizTask.get('task').get('code')}
          selector={this.props.quizTask.get('selector')}
        />
        <AnswareSection
          answareChanged={this.answareChanged}
        />
      </div>
    );
  }
}

QuizTask.propTypes = {
  quizTask: PropTypes.object,
  updateSelector: PropTypes.func,
};

QuizTask.contextTypes = {
  passTest: PropTypes.func,
};

export default QuizTask;
