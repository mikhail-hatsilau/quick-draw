import Task from '../models/task';

export function getTasks(req, resp, next) {
  Task.find({}, (err, tasks) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({
      success: true,
      tasks,
    });
  });
}

export function addTask(req, resp, next) {
  const name = req.body.name;
  const code = req.body.code;
  const answare = req.body.answare;
  const task = new Task({
    name,
    code,
    answare,
  });
  task.save((err, savedTask) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({
      success: true,
      task: savedTask,
    });
  });
}

export function removeTask(req, resp, next) {
  const taskId = req.params.id;
  Task.remove({ '_id': taskId }, (err) => {
    if (err) {
      throw new Error(err);
    }
    resp.json({ success: true });
  });
}

export function updateTask(req, resp, next) {
  const taskId = req.params.id;
  const name = req.body.name;
  const code = req.body.code;
  const answare = req.body.answare;
  const valuesForUpdate = {
    name,
    code,
    answare,
  };
  Task.findById(taskId, (err, task) => {
    if (err) {
      throw new Error(err);
    }
    if (!task) {
      resp.status(404);
      resp.json({
        success: false,
        message: 'No such task',
      });
    }
    Task.update({ _id: taskId }, valuesForUpdate, (err) => {
      if (err) {
        throw new Error(err);
      }
      resp.json({
        success: true,
        task: {
          _id: task.id,
          name,
          code,
          answare,
        },
      });
    });
  });
}
