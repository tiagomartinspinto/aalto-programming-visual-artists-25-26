(function () {
  const data = window.COURSE_DATA || {};
  const lab = data.lab || {};
  const select = document.querySelector("#sketch-select");
  const preview = document.querySelector("#preview");
  const code = document.querySelector("#code");
  const status = document.querySelector("#status");
  const title = document.querySelector("#sketch-title");
  const meta = document.querySelector("#sketch-meta");
  const openPage = document.querySelector("#open-page");
  const openSource = document.querySelector("#open-source");
  const fileWarning = document.querySelector("#file-warning");
  const params = new URLSearchParams(window.location.search);
  const isFileMode = window.location.protocol === "file:";
  let currentSketch = null;
  let originalCode = "";
  let activeP5 = null;

  const courseSketches = (data.sketches || []).map((sketch) => ({
    id: sketch.id,
    title: sketch.title,
    session: sketch.session,
    path: sketch.path || `${sketch.id}/sketch.js`,
    page: sketch.page ? sketch.page.replace(/^web\//, "") : sketch.page,
    source: sketch.source ? `../${sketch.source}` : sketch.source,
    notes: sketch.notes || sketch.try || sketch.description || "Try a small change, then run the sketch again.",
  }));

  if (isFileMode && fileWarning) {
    fileWarning.hidden = false;
  }

  function writeStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("error", isError);
  }

  function render(codeText) {
    if (activeP5) {
      activeP5.remove();
      activeP5 = null;
    }

    preview.innerHTML = '<div id="sketch" class="sketch-mount"></div>';
    const mount = preview.querySelector("#sketch");
    writeStatus("Running your sketch with the local p5.js runtime...");

    try {
      activeP5 = new p5((p) => {
        const install = new Function("p", [
          "with (p) {",
          codeText,
          "if (typeof preload === 'function') p.preload = preload;",
          "if (typeof setup === 'function') p.setup = setup;",
          "if (typeof draw === 'function') p.draw = draw;",
          "if (typeof mousePressed === 'function') p.mousePressed = mousePressed;",
          "if (typeof keyPressed === 'function') p.keyPressed = keyPressed;",
          "}",
        ].join("\n"));
        install(p);
      }, mount);
      writeStatus("Your sketch is running. Your edits stay in this browser.");
    } catch (error) {
      writeStatus(`Error: ${error.message}`, true);
    }
  }

  function showLoadProblem(error) {
    const message = isFileMode
      ? "This browser blocked the course sketch code because the Lab was opened as a local file. Use the GitHub Pages site or start a local server, then open the Lab again."
      : `The course sketch code could not be loaded: ${error.message}`;

    if (activeP5) {
      activeP5.remove();
      activeP5 = null;
    }

    preview.innerHTML = [
      '<div class="load-message">',
      "<strong>Course sketch code did not load.</strong>",
      `<span>${message}</span>`,
      "</div>",
    ].join("");
    code.value = [
      `// ${message}`,
      `// Sketch file: ${currentSketch.path}`,
      "// Your browser has not loaded editable course code yet.",
    ].join("\n");
    writeStatus(message, true);
  }

  async function loadSketch(id) {
    currentSketch = courseSketches.find((sketch) => sketch.id === id) || courseSketches[0];
    select.value = currentSketch.id;
    title.textContent = currentSketch.title;
    meta.textContent = `${currentSketch.session}. ${currentSketch.notes}`;
    openPage.href = currentSketch.page || "#";
    openSource.href = currentSketch.source || "#";
    writeStatus("Loading the sketch code...");
    history.replaceState(null, "", `?sketch=${currentSketch.id}`);
    try {
      const response = await fetch(currentSketch.path);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      originalCode = await response.text();
      code.value = originalCode;
      render(originalCode);
    } catch (error) {
      originalCode = "";
      showLoadProblem(error);
    }
  }

  function init() {
    if (!select || !preview || !code || !status || !title || !meta || !openPage || !openSource) return;
    if (!courseSketches.length) {
      writeStatus("No editable course sketches are listed for this Lab yet.", true);
      document.querySelector("#run-button")?.setAttribute("disabled", "");
      document.querySelector("#reset-button")?.setAttribute("disabled", "");
      return;
    }

    for (const sketch of courseSketches) {
      const option = document.createElement("option");
      option.value = sketch.id;
      option.textContent = `${sketch.session} - ${sketch.title}`;
      select.append(option);
    }

    select.addEventListener("change", () => loadSketch(select.value));
    document.querySelector("#run-button")?.addEventListener("click", () => render(code.value));
    document.querySelector("#reset-button")?.addEventListener("click", () => {
      code.value = originalCode;
      render(originalCode);
    });

    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "sketch-running") {
        writeStatus("Your sketch is running. Your edits stay in this browser.");
      }
      if (event.data && event.data.type === "sketch-error") {
        writeStatus(`Error: ${event.data.message} at line ${event.data.line || "?"}`, true);
      }
    });

    loadSketch(params.get("sketch") || lab.defaultSketch || courseSketches[0].id);
  }

  init();
})();
