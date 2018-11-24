import { createStore , combineReducers } from 'redux';
import uuid from 'uuid';

/* methods for Expense */
const addExpense = ({description = '' , note = '' , amount = 0 , createdAt = 0} = {}) => {
	return {
		type : 'ADD_EXPENSE' ,
		expense : {
			id : uuid() ,
			description ,
			note ,
			amount ,
			createdAt
		}
	}
}

const removeExpense = ({id} = {}) => {
	return {
		type : 'REMOVE_EXPENSE' ,
		id
	}
}

const editExpense = (id , updates) => ({
	type : 'EDIT_EXPENSE' ,
	id , 
	updates
});

/* end methods for Expense */

/* methods for Filter */

const setTextFilter = (text) => ({
	type : 'SET_TEXT_FILTER' ,
	text
});


const sortByDate = () => ({
	type : 'SORT' ,
	sortBy : 'Date'
});

const sortByAmount = () => ({
	type : 'SORT' ,
	sortBy : 'Amount'
});


const setStartDate = (startDate) => ({
	type : 'SET_START_DATE' ,
	startDate
});

const setEndDate = (endDate) => ({
	type : 'SET_END_DATE' ,
	endDate
});

/* end methods for Filter */

/* default states */

const expensesReducerDefaultState = [];
const filtersReducerDefaultState = {
	text : '' ,
	sortBy : 'date' ,
	startDate : undefined ,
	endDate : undefined
};

/* end default states */

/* Reducers */
const expensesReducer = (state = expensesReducerDefaultState , action) => {
		switch(action.type) {
			case 'ADD_EXPENSE':
				return [...state , action.expense] ;
			case 'REMOVE_EXPENSE' : 
				return state.filter( ({id}) => {
					return id != action.id ;
				});
				
			case 'EDIT_EXPENSE' :
				return state.map( (expense) => {
					
					if(expense.id === action.id) {
						return {
							...expense ,
							text : action.updates
						}
					}
					else {
						return expense;
					}
				});
			
			
			default :
				return state;
		}
}

const filtersReducer = ( state = filtersReducerDefaultState , action ) => {
	switch( action.type) {
		case 'SET_TEXT_FILTER' :
			return {
				...state ,
				text : action.text
			};
			
		case 'SORT':
			return {
				...state ,
				sortBy : action.sortBy
			};
		
		case 'SET_START_DATE':
			return {
				...state ,
				startDate : action.startDate
			};
		
		case 'SET_END_DATE':
			return {
				...state ,
				endDate : action.endDate
			};
			
		default : 
		return state;
	}
}

/* End Reducers */

/*  Get visible expenses */

const getVisibleExpenses = (expenses , {text , sortBy , startDate , endDate }) => {
	return expenses.filter( (expense) => {
		
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toUpperCase().includes(text.toUpperCase());
		
		
		return startDateMatch && endDateMatch && textMatch ;
	}).sort( ( a , b ) => {
		if( sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1 ;
		}
		else if( sortBy === 'Amount' ) {
			return a.amount < b.amount ? 1 : -1;
		}
		
	});
}

/* End Get visible expenses */

const store = createStore(
	combineReducers({
		expenses : expensesReducer ,
		filters : filtersReducer
	})
);

store.subscribe( () => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses , state.filters);
	console.log(visibleExpenses);
});



const expenseOne = store.dispatch(addExpense({
	description : 'rent' ,
	amount : 100 ,
	createdAt : 10
}));

const expenseTwo = store.dispatch(addExpense({
	description : 'coffee' ,
	amount : 300 ,
	createdAt : 100
}));


store.dispatch(setStartDate(0)); 

store.dispatch(setEndDate(1000));

//store.dispatch(setTextFilter('rent'));


// console.log(expenseOne);

// store.dispatch(removeExpense({id : expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id , {amount : 500}));


 store.dispatch(sortByAmount());
// store.dispatch(sortByDate());







