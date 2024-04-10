import numpy as np
def calculate(value):
	try:
		arr = np.array(value).reshape(3,3)
		res= {
			'mean': [list(np.mean(arr, axis=0)),list(np.mean(arr, axis=1)),arr.flatten().mean()],
			'variance': [list(np.var(arr, axis=0)),list(np.var(arr, axis=1)),arr.flatten().var()],
			'standard deviation': [list(np.std(arr, axis=0)),list(np.std(arr, axis=1)),arr.flatten().std()],
			'max': [list(np.max(arr, axis=0)),list(np.max(arr, axis=1)),arr.flatten().max()],
			'min': [list(np.min(arr, axis=0)),list(np.min(arr, axis=1)),arr.flatten().min()],
			'sum': [list(np.sum(arr, axis=0)),list(np.sum(arr, axis=1)),arr.flatten().sum()]
		}
		print(res)

	except ValueError as ve:
		print('List must contain nine numbers.')
