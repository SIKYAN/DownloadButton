import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class DownloadButton implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _notifyOutputChanged:()=>void;
	private _btn01: HTMLButtonElement;
	private _a: HTMLAnchorElement;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this._context = context;
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this._btn01 = document.createElement('button');
		this._a = document.createElement('a');
		this._btn01.innerHTML = "Download!!";
		this._container.appendChild(this._btn01);
		this._container.appendChild(this._a);
		this._btn01.addEventListener('click', ()=>{
			this._a.click()
		});
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		let dataUri = this._context.parameters.fileContent.raw?.startsWith('data:') ? this._context.parameters.fileContent.raw : 'data:${this._context.parameters.fileMIMEType.raw};base64,${this._context.parameters.fileContent.raw}';
		console.log(dataUri);
		this._a.href = dataUri;
		this._a.download = this._context.parameters.fileName.raw || "";
		let testvar = 'test';
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
