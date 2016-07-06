import React, { PropTypes } from 'react';
import TimeSection from './TimeSection';
import AnswareSection from './AnswareSection';
import CodeOfTaskSection from './CodeOfTaskSection';

class QuizTask extends React.Component {
  constructor(props) {
    super(props);
    this.answareChanged = this.answareChanged.bind(this);
    this.getDomNodeFromCode = this.getDomNodeFromCode.bind(this);
    this.checkDeprecatedSelectors = this.checkDeprecatedSelectors.bind(this);
    this.checkAnswares = this.checkAnswares.bind(this);
    this.state = {
      codeDomObject: this.getDomNodeFromCode(),
      deprecatedError: false,
      currentAnswares: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const nextPropsSelector = nextProps.quizTask.get('selector');
    if (this.props.quizTask.get('selector') !== nextPropsSelector) {
      this.checkAnswares(nextPropsSelector);
    }
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
  checkDeprecatedSelectors(selector) {
    const deprecatedSelectors = this.props.quizTask.get('task').get('deprecatedSelectors').split(',');
    for (let i = 0, l = selector.length; i < l; i++) {
      if (deprecatedSelectors.indexOf(selector[i]) !== -1) {
        this.setState({
          deprecatedError: true,
        });
        return;
      }
    }
    this.setState({
      deprecatedError: false,
    });
  }
  answareChanged(selector) {
    console.log(selector);
    this.props.updateSelector(selector);
  }
  checkAnswares(selector) {
    this.checkDeprecatedSelectors(selector);
    try {
      const queryResults = this.state.codeDomObject.querySelectorAll(selector);
      console.log(queryResults);
      const currentAnswares = [];
      for (let i = 0, l = queryResults.length; i < l; i++) {
        currentAnswares.push(queryResults[i].getAttribute('data-line'));
      }
      this.setState({
        currentAnswares,
      });
      if (currentAnswares.join(',') === this.props.quizTask.get('task').get('answare')) {
        this.context.passTest(true);
      }
    } catch (error) {
      console.log('QuerySelector error');
      this.setState({
        currentAnswares: [],
      });
    }
  }
  render() {
    return (
      <div>
        <TimeSection
          deprecatedSymbols={
            this.props.quizTask.get('task') &&
            this.props.quizTask.get('task').get('deprecatedSelectors')
          }
          timeSpent={this.props.quizTask.get('timeSpent')}
        />
        <CodeOfTaskSection
          code={this.props.quizTask.get('task') && this.props.quizTask.get('task').get('code')}
          selector={this.props.quizTask.get('selector')}
          currentAnswares={this.state.currentAnswares}
          neededAnswares={this.props.quizTask.get('task').get('answare')}
        />
        <AnswareSection
          answareChanged={this.answareChanged}
          deprecatedError={this.state.deprecatedError}
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
