import React, { useState } from 'react';

export default function App() {
	const questions = [

		{
			questionText: 'Do you want/need to use Spot Instances?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},
			],
		},
		{
			questionText: 'Do you need to run Snakemake workflows?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Do you need to run CWL workflows?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Are you able to dockerize your bioinformatic tools + upload them into a private repositor?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: true, isOmics:false, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Do you want control over which instances and instance sizes to use for your workloads?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Would you like to use “ready to use” workflows for common use cases?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:true, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Do you need an end-to-end solution for storage, secondary and tertiary analysis?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:true, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},			],
		},
		{
			questionText: 'Do you need to run your analysis in a hybrid approach (on-prem/in the Cloud)?',
			answerOptions: [
				{ answerText: 'Yes', isCorrect: true, isFinal: true, isOmics:false, refUrl:''},
				{ answerText: 'No ', isCorrect: false, isFinal: false, isOmics:true, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},		
			],
		},
		{
			questionText: 'Do you value simplicity of use and minimal technical overhead, or customization?',
			answerOptions: [
				{ answerText: 'simplicity/minimal tech. overhead', isCorrect: true, isFinal: true, isOmics:true, refUrl:''},
				{ answerText: 'customization ', isCorrect: false, isFinal: true, isOmics:false, refUrl:'' },
				{ answerText: 'Not Sure ', isCorrect: true, isFinal: false, isOmics:false, refUrl:''},		
			],
		},

	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [isOmics, setIsOmics] = useState(false);
	const [refUrl, setRefUrl] = useState();

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	const handleAnswerOptionClickconclude = (answerOption) => {
		if (answerOption.isFinal) {
			setShowScore(true);
			setRefUrl(answerOption.refUrl);
			if (answerOption.isOmics) {
				setIsOmics(true);
			}
			else {
				setIsOmics(false);
			}

		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
		<div className='app'>
			{showScore ? (
				isOmics ? (
					<div className='results'>
					Based upon your answers you should use <h2>Amazon Omics</h2>
					<p> 
					<a href='https://aws.amazon.com/omics/' target='_blank'>https://aws.amazon.com/omics/</a>
					</p>
					{refUrl}
				</div>
				) : (
					<div className='results'>
						Based upon your answers you should use <h2>Amazon Genomics Cli</h2>
					<p> 
					<a href='https://aws.amazon.com/genomics-cli' target='_blank'>https://aws.amazon.com/genomics-cli</a>
					</p>
					{refUrl}
					
				</div>
				)
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClickconclude(answerOption)}>{answerOption.answerText}</button>
						))}
					</div>
					
				</>
			)}
		</div>
	);
}
