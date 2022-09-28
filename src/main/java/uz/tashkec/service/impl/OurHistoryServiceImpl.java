package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.OurHistory;
import uz.tashkec.repository.OurHistoryRepository;
import uz.tashkec.service.OurHistoryService;
import uz.tashkec.service.dto.OurHistoryDTO;
import uz.tashkec.service.mapper.OurHistoryMapper;

/**
 * Service Implementation for managing {@link OurHistory}.
 */
@Service
@Transactional
public class OurHistoryServiceImpl implements OurHistoryService {

    private final Logger log = LoggerFactory.getLogger(OurHistoryServiceImpl.class);

    private final OurHistoryRepository ourHistoryRepository;

    private final OurHistoryMapper ourHistoryMapper;

    public OurHistoryServiceImpl(OurHistoryRepository ourHistoryRepository, OurHistoryMapper ourHistoryMapper) {
        this.ourHistoryRepository = ourHistoryRepository;
        this.ourHistoryMapper = ourHistoryMapper;
    }

    @Override
    public OurHistoryDTO save(OurHistoryDTO ourHistoryDTO) {
        log.debug("Request to save OurHistory : {}", ourHistoryDTO);
        OurHistory ourHistory = ourHistoryMapper.toEntity(ourHistoryDTO);
        ourHistory = ourHistoryRepository.save(ourHistory);
        return ourHistoryMapper.toDto(ourHistory);
    }

    @Override
    public OurHistoryDTO update(OurHistoryDTO ourHistoryDTO) {
        log.debug("Request to update OurHistory : {}", ourHistoryDTO);
        OurHistory ourHistory = ourHistoryMapper.toEntity(ourHistoryDTO);
        ourHistory = ourHistoryRepository.save(ourHistory);
        return ourHistoryMapper.toDto(ourHistory);
    }

    @Override
    public Optional<OurHistoryDTO> partialUpdate(OurHistoryDTO ourHistoryDTO) {
        log.debug("Request to partially update OurHistory : {}", ourHistoryDTO);

        return ourHistoryRepository
            .findById(ourHistoryDTO.getId())
            .map(existingOurHistory -> {
                ourHistoryMapper.partialUpdate(existingOurHistory, ourHistoryDTO);

                return existingOurHistory;
            })
            .map(ourHistoryRepository::save)
            .map(ourHistoryMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OurHistoryDTO> findAll() {
        log.debug("Request to get all OurHistories");
        return ourHistoryRepository.findAll().stream().map(ourHistoryMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OurHistoryDTO> findOne(Long id) {
        log.debug("Request to get OurHistory : {}", id);
        return ourHistoryRepository.findById(id).map(ourHistoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OurHistory : {}", id);
        ourHistoryRepository.deleteById(id);
    }
}
