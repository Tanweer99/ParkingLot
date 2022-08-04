namespace ParkingLot.Shared.Model
{
    public interface IParkingLotDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string BookSlotCollectionName { get; set; }
        string SlotCollectionName { get; set; }
        string AuthenticationCollectionName { get; set; }
    }
}